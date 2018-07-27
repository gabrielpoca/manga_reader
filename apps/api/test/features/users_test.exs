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
  end
end
