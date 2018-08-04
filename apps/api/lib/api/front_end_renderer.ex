defmodule Api.FrontEndRenderer do
  def init(opts), do: opts

  def call(%Plug.Conn{request_path: "/api" <> _} = conn, _opts) do
    conn
  end

  def call(conn, _opts) do
    index_file = Application.app_dir(:api, "/priv/static/index.html")

    Plug.Conn.send_file(conn, 200, index_file)
    |> Plug.Conn.halt()
  end
end
