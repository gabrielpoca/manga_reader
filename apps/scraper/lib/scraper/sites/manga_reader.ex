defmodule Scraper.Sites.MangaReader do
  use Scraper.Sites.Requester, url: "https://www.mangareader.net"

  @type simple_manga :: %{
          manga_id: String.t(),
          name: String.t(),
          cover: String.t()
        }

  @type page :: %{
          page_id: String.t(),
          src: String.t()
        }

  @type simple_chapter :: %{
          manga_id: String.t(),
          chapter_id: String.t(),
          name: String.t()
        }

  @spec all() :: [simple_manga, ...]
  def all() do
    {:ok, %{body: body}} = get("/alphabetical")

    body
    |> Floki.find("ul.series_alpha li")
    |> Enum.map(fn n ->
      href = n |> Floki.find("a") |> Floki.attribute("href") |> hd
      name = n |> Floki.find("a") |> Floki.text() |> String.trim()
      manga_id = href |> String.trim("/")

      %{
        manga_id: manga_id,
        name: name,
        cover: "https://s2.mangareader.net/cover/#{href}/#{href}-l0.jpg"
      }
    end)
    |> Enum.sort_by(&Map.fetch(&1, :name))
  end

  @spec all() :: [simple_manga, ...]
  def popular() do
    {:ok, %{body: body}} = get("/popular")

    body
    |> Floki.find("#mangaresults .mangaresultinner")
    |> Enum.map(fn n ->
      name = n |> Floki.find("h3 a") |> Floki.text() |> String.trim()

      manga_id =
        n
        |> Floki.find("h3 a")
        |> Floki.attribute("href")
        |> hd
        |> String.trim("/")

      %{
        manga_id: manga_id,
        name: name,
        cover: "https://s2.mangareader.net/cover/#{manga_id}/#{manga_id}-l0.jpg"
      }
    end)
  end

  @spec manga(String.t()) :: %{
          chapters: [simple_chapter, ...],
          cover: String.t(),
          manga_id: String.t(),
          name: String.t()
        }
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
          name: name
        }
      end)

    name =
      body
      |> Floki.find("#mangaproperties .aname")
      |> Floki.text()

    cover =
      body
      |> Floki.find("#mangaimg img")
      |> Floki.attribute("src")
      |> hd

    %{manga_id: id, name: name, chapters: chapters, cover: cover}
  end

  @spec chapter(String.t(), String.t()) :: %{
          chapter_id: String.t(),
          manga_id: String.t(),
          name: String.t(),
          pages: [page, ...]
        }
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

  defp parse_page_body(page_id, body) do
    src =
      body
      |> Floki.find(".episode-table img")
      |> Floki.attribute("src")
      |> hd

    %{page_id: page_id, src: src}
  end
end
