defmodule Api.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, unique: true, null: false
      add :hashed_password, :string, null: false
      timestamps()
    end

    create(unique_index(:users, [:username], name: :unique_usernames))
  end
end
