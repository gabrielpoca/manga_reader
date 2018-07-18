defmodule Api.GraphqlHelper do
  use Phoenix.ConnTest

  @endpoint Api.Endpoint

  def graphql_query(conn, options) do
    conn
    |> post("/api/graphql", build_query(options[:query], options[:variables]))
    |> json_response(200)
  end

  defp build_query(query, variables) do
    %{
      "query" => query,
      "variables" => variables
    }
  end
end
