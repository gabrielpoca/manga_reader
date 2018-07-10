defmodule Api.Users.Query do
  alias Api.Users.Schema
  alias Api.Repo

  def get_by(args) do
    Schema
    |> Repo.get_by(args)
  end

  def insert(user) do
    %Schema{}
    |> Schema.changeset(user)
    |> Repo.insert()
  end
end
