defmodule Api.Endpoint do
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

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_api_key",
    signing_salt: "DBoBPP/6"

  plug Api.FrontEndRenderer
  plug Api.Router
end
