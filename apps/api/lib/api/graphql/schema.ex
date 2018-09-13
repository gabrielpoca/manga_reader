defmodule Api.Graphql.Schema do
  use Absinthe.Schema

  alias Api.Graphql.Resolvers

  query do
    field :mangas, list_of(:manga_simple) do
      arg(:site, :string)

      resolve(&Resolvers.all/3)
    end

    field :manga, :manga do
      arg(:site, :string)
      arg(:manga_id, non_null(:id))

      resolve(&Resolvers.manga/3)
    end

    field :chapter, :chapter do
      arg(:site, :string)
      arg(:manga_id, non_null(:string))
      arg(:chapter_id, non_null(:id))

      resolve(&Resolvers.chapter/3)
    end
  end

  object :manga_simple do
    field :manga_id, :id
    field :name, :string
    field :cover, :string
  end

  object :manga do
    field :manga_id, :id
    field :name, :string
    field :chapters, list_of(:chapter_simple)
    field :cover, :string
  end

  object :chapter_simple do
    field :chapter_id, :id
    field :manga_id, :string
    field :name, :string
  end

  object :chapter do
    field :chapter_id, :id
    field :manga_id, :string
    field :name, :string
    field :pages, list_of(:page)
  end

  object :page do
    field :page_id, :id
    field :src, :string
  end
end
