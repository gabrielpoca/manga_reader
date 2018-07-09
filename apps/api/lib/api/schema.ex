defmodule Api.Schema do
  use Absinthe.Schema

  query do
    field :me, :user do
      resolve(fn _, _ ->
        {:ok, %{id: 1, username: "g"}}
      end)
    end

    field :mangas, list_of(:manga_simple) do
      resolve(fn _, _ ->
        {:ok, Scraper.MangaReaderNet.all()}
      end)
    end

    field :manga, :manga do
      arg(:manga_id, non_null(:id))

      resolve(fn %{manga_id: manga_id}, _ ->
        {:ok, Scraper.MangaReaderNet.manga(manga_id)}
      end)
    end

    field :chapter, :chapter do
      arg(:chapter_id, non_null(:id))

      resolve(fn %{chapter_id: chapter_id}, _ ->
        {:ok, Scraper.MangaReaderNet.chapter(chapter_id)}
      end)
    end
  end

  object :user do
    field :id, :id
    field :username, :string
  end

  object :manga_simple do
    field :manga_id, :id
    field :href, :string
    field :name, :string
  end

  object :manga do
    field :manga_id, :id
    field :href, :string
    field :name, :string
    field :chapters, list_of(:chapter_simple)
  end

  object :chapter_simple do
    field :chapter_id, :id
    field :href, :string
    field :name, :string
  end

  object :chapter do
    field :chapter_id, :id
    field :href, :string
    field :name, :string
    field :pages, list_of(:string)
  end
end
