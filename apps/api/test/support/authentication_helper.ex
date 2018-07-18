defmodule Api.AuthenticationHelper do
  alias Api.Guardian

  def authenticate_user(conn, user) do
    {:ok, token, _claims} = Guardian.encode_and_sign(user)

    conn
    |> Plug.Conn.put_req_header("authorization", "Bearer " <> token)
  end
end
