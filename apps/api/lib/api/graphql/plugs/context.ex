defmodule Api.Graphql.Plugs.Context do
  @behaviour Plug

  import Plug.Conn

  alias Api.Guardian

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, current_user} <- authorize(token) do
      %{current_user: current_user}
    else
      _error -> %{}
    end
  end

  defp authorize(token) do
    case Guardian.resource_from_token(token) do
      {:ok, user, _claims} -> {:ok, user}
      _ -> {:error, "invalid authorization token"}
    end
  end
end
