defmodule Scraper.MangaReaderNet do
  use Tesla

  plug Tesla.Middleware.BaseUrl, "https://www.mangareader.net"

  def all() do
    {:ok, %{body: body}} = get("/alphabetical")

    body
    |> Floki.find("ul.series_alpha li a")
    |> Enum.map(fn n ->
      href = Floki.attribute(n, "href") |> hd
      %{manga_id: String.trim(href, "/"), href: href, name: Floki.text(n)}
    end)
  end

  def manga(id) do
    {:ok, %{body: body}} = get("/" <> id)

    chapters =
      body
      |> Floki.find("#chapterlist a")
      |> Enum.map(fn n ->
        href = Floki.attribute(n, "href") |> hd
        %{id: String.trim(href, "/"), href: href, name: Floki.text(n)}
      end)

    %{manga_id: id, chapters: chapters}
  end

  def chapter(chapter_id) do
    {:ok, %{body: first_page}} = get("/" <> chapter_id)

    {last_chapter_nr, ""} =
      first_page
      |> Floki.find("#selectpage option:last-child")
      |> Floki.text()
      |> Integer.parse()

    other_chapters =
      2..last_chapter_nr
      |> Flow.from_enumerable()
      |> Flow.partition()
      |> Flow.map(fn chapter ->
        {:ok, %{body: body}} = get("/#{chapter_id}/#{chapter}")
        parse_chapter_page(body)
      end)
      |> Enum.to_list()

    [_, manga_id] = Regex.run(~r/(.*)\/.*/, chapter_id)

    %{
      manga_id: manga_id,
      chapter_id: chapter_id,
      pages: [parse_chapter_page(first_page) | other_chapters]
    }
  end

  defp parse_chapter_page(body) do
    body
    |> Floki.find(".episode-table img")
    |> Floki.attribute("src")
    |> hd
  end
end
