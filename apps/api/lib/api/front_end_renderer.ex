defmodule Api.FrontEndRenderer do
  def init(opts), do: opts

  def call(%Plug.Conn{request_path: "/api" <> _} = conn, _opts) do
    conn
  end

  def call(conn, _opts) do
    index_file = Application.app_dir(:api, "/priv/static/index.html")

    conn
    |> Plug.Conn.put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, index_file)
    |> Plug.Conn.halt()
  end
end
