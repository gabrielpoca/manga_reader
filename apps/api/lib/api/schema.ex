defmodule Api.Schema do
  use Absinthe.Schema

  alias Api.Resolvers

  query do
    field :me, :user do
      resolve(fn _, _ ->
        {:ok, %{id: 1, username: "g"}}
      end)
    end

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
      arg(:chapter_id, non_null(:id))

      resolve(&Resolvers.chapter/3)
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
    field :manga_id, :string
    field :name, :string
    field :pages, list_of(:string)
  end
end
