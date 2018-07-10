defmodule Api.Repo do
  use Ecto.Repo, otp_app: :api

  def init(_, opts) do
    updated_opts =
      opts
      |> Keyword.merge(db_config())

    {:ok, updated_opts}
  end

  defp db_config do
    [
      username: os_env!("POSTGRESQL_USER"),
      password: os_env!("POSTGRESQL_PASSWORD"),
      database: os_env!("POSTGRESQL_DB"),
      hostname: os_env!("POSTGRESQL_HOST"),
      pool_size: os_env!("POSTGRESQL_POOL_SIZE")
    ]
  end

  defp os_env!(name) do
    case System.get_env(name) do
      nil ->
        raise "OS ENV #{name} not set!"

      value ->
        value
    end
  end
end
