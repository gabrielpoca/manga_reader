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

  def update_progress(id, params) do
    %Schema{id: id}
    |> Schema.progress_changeset(params)
    |> Repo.update()
  end

  def authenticate_user(username, password) do
    with user <- Repo.get_by!(Schema, username: username),
         true <- Api.Password.check(password, user.hashed_password) do
      {:ok, user}
    else
      error -> error
    end
  rescue
    _ -> {:error, :not_found}
  end
end
