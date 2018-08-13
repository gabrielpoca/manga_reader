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

    test "resturns the current user", %{conn: conn} do
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
      {:ok, user} =
        Api.Users.Query.insert(%{username: "gabrielpoca", password: "1234 "})

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
            readChaptersByMangaId: Poison.encode!(%{a: "gabrielpoca"}),
            ongoingChapterByMangaId: Poison.encode!(%{b: "1234"})
          }
        })

      assert res["data"]["updateProgress"]["progress"]["readChaptersByMangaId"][
               "a"
             ] == "gabrielpoca"

      assert res["data"]["updateProgress"]["progress"][
               "ongoingChapterByMangaId"
             ]["b"] == "1234"
    end

    test "authenticates a user", %{conn: conn} do
      Api.Users.Query.insert(%{username: "gabrielpoca", password: "1234"})

      query = """
        mutation AuthenticateUser($username: String!, $password: String!) {
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
