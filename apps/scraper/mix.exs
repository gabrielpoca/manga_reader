defmodule Scraper.Mixfile do
  use Mix.Project

  def project do
    [
      app: :scraper,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.5",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {Scraper.Application, []}
    ]
  end

  defp deps do
    [
      {:floki, "~> 0.20.0"},
      {:tesla, "~> 1.0.0"},
      {:flow, "~> 0.14"},
      {:timex, "~> 3.1"}
    ]
  end
end
