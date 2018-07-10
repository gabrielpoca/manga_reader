defmodule Api.Users.Schema do
  use Ecto.Schema

  import Ecto.Changeset

  alias Api.Password

  @required_fields ~w(username password)

  schema "users" do
    field :username, :string
    field :hashed_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  def changeset(user, params \\ %{}) do
    user
    |> cast(params, @required_fields)
    |> unique_constraint(:username, name: :unique_usernames)
    |> validate_required([:username, :password])
    |> generate_password_hash()
  end

  defp generate_password_hash(changeset) do
    password = get_change(changeset, :password)
    hash = Password.hash(password)
    changeset |> put_change(:hashed_password, hash)
  end
end
