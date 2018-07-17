defmodule Scraper.Sites.MangaReaderNet do
  alias Scraper.Sites.Cache

  def all() do
    {:ok, %{body: body}} = get("/alphabetical")

    body
    |> Floki.find("ul.series_alpha li a")
    |> Enum.map(fn n ->
      href = n |> Floki.attribute("href") |> hd
      name = n |> Floki.text() |> String.trim()
      manga_id = href |> String.trim("/")

      %{
        manga_id: manga_id,
        href: href,
        name: name,
        cover: "https://s2.mangareader.net/cover/#{href}/#{href}-l0.jpg"
      }
    end)
    |> Enum.sort_by(&Map.fetch(&1, :name))
  end

  def manga(id) do
    href = "/#{id}"
    {:ok, %{body: body}} = get(href)

    chapters =
      body
      |> Floki.find("#chapterlist a")
      |> Enum.map(fn n ->
        href = n |> Floki.attribute("href") |> hd
        name = n |> Floki.text() |> String.trim()
        [_, chapter_id] = Regex.run(~r/\/?.*\/(.*)\/?/, href)

        %{
          manga_id: id,
          chapter_id: chapter_id,
          href: href,
          name: name
        }
      end)

    name =
      body
      |> Floki.find("#mangaproperties h1")
      |> Floki.text()

    cover =
      body
      |> Floki.find("#mangaimg img")
      |> Floki.attribute("src")

    %{manga_id: id, href: href, name: name, chapters: chapters, cover: cover}
  end

  def chapter(manga_id, chapter_id) do
    {:ok, %{body: first_page}} = get("/#{manga_id}/#{chapter_id}")

    {last_page_nr, ""} =
      first_page
      |> Floki.find("#selectpage option:last-child")
      |> Floki.text()
      |> Integer.parse()

    other_pages =
      2..last_page_nr
      |> Flow.from_enumerable()
      |> Flow.partition()
      |> Flow.map(fn page_id ->
        {:ok, %{body: body}} = get("/#{manga_id}/#{chapter_id}/#{page_id}")

        parse_page_body(page_id, body)
      end)
      |> Enum.to_list()
      |> Enum.sort_by(&Map.get(&1, :page_id))

    name =
      first_page
      |> Floki.find("#mangainfo h1")
      |> Floki.text()

    %{
      name: name,
      manga_id: manga_id,
      chapter_id: chapter_id,
      pages: [parse_page_body(1, first_page) | other_pages]
    }
  end

  defp get(url) do
    full_url = "https://www.mangareader.net#{url}"

    case get_from_cache(full_url) do
      {:not_found} ->
        {:ok, res} = Tesla.get(full_url)
        set_in_cache(full_url, res)
        {:ok, res}

      {:ok, res} ->
        {:ok, res}
    end
  end

  defp get_from_cache(url) do
    Cache.get(url)
  end

  defp set_in_cache(url, response) do
    Cache.set(url, response)
  end

  defp parse_page_body(page_id, body) do
    src =
      body
      |> Floki.find(".episode-table img")
      |> Floki.attribute("src")
      |> hd

    %{page_id: page_id, src: src}
  end
end
