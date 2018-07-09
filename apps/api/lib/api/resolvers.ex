defmodule Api.Resolvers do
  alias Scraper.Sites.MangaReaderNet

  def all(_parent, args, _resolution) do
    {:ok, get_site_scraper(args).all()}
  end

  def manga(_parent, %{manga_id: manga_id} = args, _resolution) do
    {:ok, get_site_scraper(args).manga(manga_id)}
  end

  def chapter(_parent, %{chapter_id: chapter_id} = args, _resolution) do
    {:ok, get_site_scraper(args).chapter(chapter_id)}
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
