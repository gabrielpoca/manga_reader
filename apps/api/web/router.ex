defmodule Api.Router do
  use Api.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: Api.Schema

    forward "/", Absinthe.Plug, schema: Api.Schema
  end
end
