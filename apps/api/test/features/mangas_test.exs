defmodule Api.Features.MangasTest do
  use Api.ConnCase
  use Api.VcrCase

  describe "manga api" do
    test "it returns all mangas", %{conn: conn} do
      use_cassette("feature_mangas_all") do
        query = """
        {
          mangas {
            name
            manga_id
          }
        }
        """

        res =
          conn
          |> post("api/graphql", %{
            query: query
          })
          |> json_response(200)

        assert Enum.count(res["data"]["mangas"]) == 4898
      end
    end

    test "it returns a single mangas", %{conn: conn} do
      use_cassette("feature_mangas_manga") do
        query = """
        query ($id: String!) {
          manga(mangaId: $id) {
            name
            manga_id
            chapters {
              chapter_id
              name
            }
          }
        }
        """

        res =
          conn
          |> post("api/graphql", %{
            query: query,
            variables: %{
              id: "naruto"
            }
          })
          |> json_response(200)

        assert res["data"]["manga"]["manga_id"] == "naruto"
      end
    end

    test "it returns a single chapter", %{conn: conn} do
      use_cassette("feature_mangas_chapter") do
        query = """
        query ($mangaId: String!, $chapterId: String!) {
          chapter(mangaId: $mangaId, chapterId: $chapterId) {
            chapter_id
            manga_id
            name
            pages {
              page_id
              src
            }
          }
        }
        """

        res =
          conn
          |> post("api/graphql", %{
            query: query,
            variables: %{
              mangaId: "naruto",
              chapterId: "1"
            }
          })
          |> json_response(200)

        assert res["data"]["chapter"]["manga_id"] == "naruto"
        assert res["data"]["chapter"]["chapter_id"] == "1"
        assert res["data"]["chapter"]["pages"]
      end
    end
  end
end
