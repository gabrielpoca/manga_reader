defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
    plug(Api.Graphql.Plugs.Context)
  end

  scope "/api" do
    pipe_through(:api)

    forward("/graphiql", Absinthe.Plug.GraphiQL, schema: Api.Graphql.Schema)

    forward("/", Absinthe.Plug, schema: Api.Graphql.Schema)
  end
end
