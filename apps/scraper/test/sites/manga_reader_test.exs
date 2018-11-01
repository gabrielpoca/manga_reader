defmodule Scraper.Sites.MangaReaderTest do
  use Scraper.VcrCase

  import Mock

  alias Scraper.Sites.{MangaReader, Cache}

  describe "all" do
    test "returns little information about every manga" do
      use_cassette "manga_reader_all" do
        mangas = MangaReader.all()

        single_manga =
          mangas |> Enum.find(fn manga -> manga[:manga_id] == "aaa" end)

        assert Enum.count(mangas) == 4898
        assert single_manga[:cover]
        assert single_manga[:name]
      end
    end
  end

  describe "manga" do
    test "returns detailed information about a single manga" do
      use_cassette "manga_reader_popular" do
        mangas = MangaReader.popular()

        single_manga =
          mangas |> Enum.find(fn manga -> manga[:manga_id] == "naruto" end)

        assert Enum.count(mangas) == 30
        assert single_manga[:cover]
        assert single_manga[:name]
      end
    end
  end

  describe "chapter" do
    test "returns detailed information about a single chapter" do
      use_cassette "manga_reader_chapter" do
        chapter = MangaReader.chapter("naruto", "1")
        pages = chapter[:pages]
        first_page = pages |> hd

        assert chapter[:chapter_id] == "1"
        assert chapter[:manga_id] == "naruto"
        assert chapter[:name]
        assert Enum.count(pages) == 53
        assert first_page[:page_id] == 1
        assert first_page[:src]
      end
    end
  end

  describe "using cache" do
    test "reads from the cache before requesting from the network" do
      use_cassette "manga_reader_cache" do
        set = fn _url, _res -> {:ok} end

        get = fn _url ->
          pid = self()
          Task.async(fn -> send(pid, :called) end)
          {:not_found}
        end

        with_mock Cache, get: get, set: set do
          MangaReader.all()
          assert_receive :called, 200
        end
      end
    end

    test "writes to cache after requesting from the network" do
      use_cassette "manga_reader_cache" do
        set = fn _url, _res ->
          pid = self()
          Task.async(fn -> send(pid, :called) end)
          {:ok}
        end

        get = fn _url -> {:not_found} end

        with_mock Cache, get: get, set: set do
          MangaReader.all()
          assert_receive :called, 200
        end
      end
    end
  end
end
