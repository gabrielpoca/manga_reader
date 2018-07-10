defmodule Api.SecretKey do
  def fetch do
    name = "SECRET_KEY"

    case System.get_env(name) do
      nil ->
        raise "OS ENV #{name} not set!"

      value ->
        value
    end
  end
end
