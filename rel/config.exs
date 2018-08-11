# Path.join(["rel", "plugins", "*.exs"])
# |> Path.wildcard()
# |> Enum.map(&Code.eval_file(&1))

use Mix.Releases.Config,
  default_release: :default,
  default_environment: :prod

environment :prod do
  set(include_erts: true)
  set(include_src: false)

  set(cookie: "awesomemanga")
end

release :manga_reader do
  set(version: "0.0.1")

  set(
    applications: [
      :runtime_tools,
      api: :permanent,
      scraper: :permanent,
      release_manager: :permanent
    ]
  )

  set(pre_start_hook: "rel/commands/migrate.sh")

  set(
    commands: [
      migrate: "rel/commands/migrate.sh"
    ]
  )
end
