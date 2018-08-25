defmodule Api.Features.AuthenticationTest do
  use Api.ConnCase
  use Api.VcrCase

  describe "user management" do
    test "creates a user", %{conn: conn} do
      query = """
        mutation RegisterUser($username: String!, $password: String!) {
          createUser(username: $username, password: $password) {
            username
          }
        }
      """

      res =
        conn
        |> graphql_query(%{
          query: query,
          variables: %{
            username: "gabrielpoca",
            password: "1234"
          }
        })

      assert res["data"]["createUser"]["username"] == "gabrielpoca"
    end

    test "returns the current user", %{conn: conn} do
      {:ok, user} =
        Api.Users.Query.insert(%{username: "gabrielpoca", password: "1234 "})

      query = """
      {
        me {
          username
          token
        }
      }
      """

      res =
        conn
        |> authenticate_user(user)
        |> graphql_query(%{
          query: query
        })

      assert res["data"]["me"]["username"] == "gabrielpoca"
      assert res["data"]["me"]["token"]
    end

    test "updates a user's progress", %{conn: conn} do
      user_params = %{
        username: "gabrielpoca",
        password: "1234",
        progress: %{
          read_chapters_by_manga_id: %{
            naruto: [1, 2, 3]
          },
          ongoing_chapter_by_manga_id: %{
            naruto: 5
          }
        }
      }

      {:ok, user} = Api.Users.Query.insert(user_params)

      query = """
        mutation UpdateProgress($readChaptersByMangaId: Json!, $ongoingChapterByMangaId: Json!) {
          updateProgress(readChaptersByMangaId: $readChaptersByMangaId, ongoingChapterByMangaId: $ongoingChapterByMangaId) {
            progress {
              readChaptersByMangaId
              ongoingChapterByMangaId
            }
          }
        }
      """

      res =
        conn
        |> authenticate_user(user)
        |> graphql_query(%{
          query: query,
          variables: %{
            readChaptersByMangaId: Poison.encode!(%{naruto: [3, 4, 5]}),
            ongoingChapterByMangaId: Poison.encode!(%{naruto: 8})
          }
        })

      progress = res["data"]["updateProgress"]["progress"]
      assert progress["readChaptersByMangaId"]["naruto"] == [1, 2, 3, 4, 5]
      assert progress["ongoingChapterByMangaId"]["naruto"] == 8
    end

    test "merges the ongoing progress keeping the current value", %{conn: conn} do
      user_params = %{
        username: "gabrielpoca",
        password: "1234",
        progress: %{
          ongoing_chapter_by_manga_id: %{
            "naruto" => 6
          }
        }
      }

      {:ok, user} = Api.Users.Query.insert(user_params)

      query = """
        mutation UpdateProgress($ongoingChapterByMangaId: Json!) {
          updateProgress(ongoingChapterByMangaId: $ongoingChapterByMangaId) {
            progress {
              ongoingChapterByMangaId
            }
          }
        }
      """

      res =
        conn
        |> authenticate_user(user)
        |> graphql_query(%{
          query: query,
          variables: %{
            ongoingChapterByMangaId: Poison.encode!(%{"naruto" => 5})
          }
        })

      progress = res["data"]["updateProgress"]["progress"]
      assert progress["ongoingChapterByMangaId"]["naruto"] == 6
    end

    test "merges the ongoing progress keeping the new value", %{conn: conn} do
      user_params = %{
        username: "gabrielpoca",
        password: "1234",
        progress: %{
          ongoing_chapter_by_manga_id: %{
            "naruto" => 5
          }
        }
      }

      {:ok, user} = Api.Users.Query.insert(user_params)

      query = """
        mutation UpdateProgress($ongoingChapterByMangaId: Json!) {
          updateProgress(ongoingChapterByMangaId: $ongoingChapterByMangaId) {
            progress {
              ongoingChapterByMangaId
            }
          }
        }
      """

      res =
        conn
        |> authenticate_user(user)
        |> graphql_query(%{
          query: query,
          variables: %{
            ongoingChapterByMangaId: Poison.encode!(%{"naruto" => 6})
          }
        })

      progress = res["data"]["updateProgress"]["progress"]
      assert progress["ongoingChapterByMangaId"]["naruto"] == 6
    end

    test "merges the reading progress", %{conn: conn} do
      user_params = %{
        username: "gabrielpoca",
        password: "1234",
        progress: %{
          read_chapters_by_manga_id: %{
            "naruto" => [1, 2, 3, 4]
          }
        }
      }

      {:ok, user} = Api.Users.Query.insert(user_params)

      query = """
        mutation UpdateProgress($readChaptersByMangaId: Json!) {
          updateProgress(readChaptersByMangaId: $readChaptersByMangaId) {
            progress {
              readChaptersByMangaId
            }
          }
        }
      """

      res =
        conn
        |> authenticate_user(user)
        |> graphql_query(%{
          query: query,
          variables: %{
            readChaptersByMangaId: Poison.encode!(%{"naruto" => [3, 4, 5, 6]})
          }
        })

      progress = res["data"]["updateProgress"]["progress"]
      assert progress["readChaptersByMangaId"]["naruto"] == [1, 2, 3, 4, 5, 6]
    end

    test "authenticates a user", %{conn: conn} do
      Api.Users.Query.insert(%{username: "gabrielpoca", password: "1234"})

      query = """
        query($username: String!, $password: String!) {
          authenticateUser(username: $username, password: $password) {
            token
          }
        }
      """

      res =
        conn
        |> graphql_query(%{
          query: query,
          variables: %{
            username: "gabrielpoca",
            password: "1234"
          }
        })

      assert res["data"]["authenticateUser"]["token"]
    end
  end
end
