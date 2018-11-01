use Mix.Releases.Config,
  default_release: :default,
  default_environment: :prod

environment :prod do
  set(include_erts: true)
  set(include_src: false)

  set(cookie: "placeholder")
end

release :manga_reader do
  set(version: "0.0.1")

  set(
    applications: [
      :runtime_tools,
      api: :permanent,
      scraper: :permanent
    ]
  )
end
