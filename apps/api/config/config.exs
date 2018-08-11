# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :api, Api.Endpoint,
  url: [host: "localhost"],
  secret_key_base:
    "7U+hZtw6nf3XIwpgdGhQBhzay1K7LhiPMDC7U6ZgMjJs+mUSxNcF0VKiSZi+HluS",
  render_errors: [view: Api.ErrorView, accepts: ~w(json)],
  pubsub: [name: Api.PubSub, adapter: Phoenix.PubSub.PG2]

config :api, Api.Guardian,
  issuer: "api",
  secret_key: {Api.SecretKey, :fetch, []}

config :api, ecto_repos: [Api.Repo]
config :api, Api.Repo, adapter: Ecto.Adapters.Postgres

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
