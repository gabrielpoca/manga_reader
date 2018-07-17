defmodule Scraper.Sites.MangaReaderNetTest do
  use Scraper.VcrCase

  import Mock

  alias Scraper.Sites.{MangaReaderNet, Cache}

  describe "all" do
    test "returns little information about every manga" do
      use_cassette "manga_reader_net_all" do
        mangas = MangaReaderNet.all()
        first_manga = mangas |> hd

        assert Enum.count(mangas) == 4632
        assert first_manga[:manga_id] == "000000-ultra-black"
        assert first_manga[:cover]
        assert first_manga[:name]
      end
    end
  end

  describe "manga" do
    test "returns detailed information about a single manga" do
      use_cassette "manga_reader_net_manga" do
        manga = MangaReaderNet.manga("naruto")
        chapters = manga[:chapters]
        first_chapter = chapters |> hd

        assert manga[:manga_id] == "naruto"
        assert manga[:href]
        assert manga[:cover]
        assert manga[:name]
        assert Enum.count(chapters) == 700
        assert first_chapter[:chapter_id] == "1"
        assert first_chapter[:manga_id] == "naruto"
        assert first_chapter[:name]
      end
    end
  end

  describe "chapter" do
    test "returns detailed information about a single chapter" do
      use_cassette "manga_reader_net_chapter" do
        chapter = MangaReaderNet.chapter("naruto", "1")
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
      use_cassette "manga_reader_net_cache" do
        set = fn _url, _res -> {:ok} end

        get = fn _url ->
          pid = self()
          Task.async(fn -> send(pid, :called) end)
          {:not_found}
        end

        with_mock Cache, get: get, set: set do
          MangaReaderNet.all()
          assert_receive :called, 200
        end
      end
    end

    test "writes to cache after requesting from the network" do
      use_cassette "manga_reader_net_cache" do
        set = fn _url, _res ->
          pid = self()
          Task.async(fn -> send(pid, :called) end)
          {:ok}
        end

        get = fn _url -> {:not_found} end

        with_mock Cache, get: get, set: set do
          MangaReaderNet.all()
          assert_receive :called, 200
        end
      end
    end
  end
end
