defmodule ApiWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :api

  plug(
    Plug.Static,
    at: "/",
    from: {:api, "priv/static"},
    gzip: false
  )

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  if Mix.env() == :dev do
    plug CORSPlug
  end

  if Mix.env() == :prod do
    plug ApiWeb.FrontEndRenderer
  end

  plug ApiWeb.Router
end
