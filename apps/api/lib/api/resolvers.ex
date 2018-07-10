defmodule Api.Resolvers do
  alias Scraper.Sites.MangaReaderNet
  alias Api.Users.Query
  alias Api.Guardian

  def all(_parent, args, _resolution) do
    {:ok, get_site_scraper(args).all()}
  end

  def manga(_parent, %{manga_id: manga_id} = args, _resolution) do
    {:ok, get_site_scraper(args).manga(manga_id)}
  end

  def chapter(_parent, %{chapter_id: chapter_id} = args, _resolution) do
    {:ok, get_site_scraper(args).chapter(chapter_id)}
  end

  def create_user(_parent, user, _resolution) do
    case Query.insert(user) do
      {:ok, user} ->
        {:ok, token, claims} = Guardian.encode_and_sign(user)
        {:ok, %{username: user.username, token: token}}

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  defp get_site_scraper(args) do
    case args do
      %{site: "mangareader.net"} ->
        MangaReaderNet

      _ ->
        MangaReaderNet
    end
  end
end
