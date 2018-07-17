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
      arg(:manga_id, non_null(:string))
      arg(:chapter_id, non_null(:id))

      resolve(&Resolvers.chapter/3)
    end
  end

  mutation do
    field :create_user, type: :user do
      arg(:username, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.create_user/3)
      middleware(Api.Middlewares.HandleChangesetErrors)
    end
  end

  object :user do
    field :username, :string
    field :token, :string
  end

  object :manga_simple do
    field :manga_id, :id
    field :href, :string
    field :name, :string
    field :cover, :string
  end

  object :manga do
    field :manga_id, :id
    field :href, :string
    field :name, :string
    field :chapters, list_of(:chapter_simple)
    field :cover, :string
  end

  object :chapter_simple do
    field :chapter_id, :id
    field :manga_id, :string
    field :href, :string
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
