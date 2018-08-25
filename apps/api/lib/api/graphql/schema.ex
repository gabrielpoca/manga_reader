defmodule Api.Graphql.Schema do
  use Absinthe.Schema

  alias Api.Graphql.Resolvers

  import_types(Api.Schema.Types.JSON)

  query do
    field :me, :user do
      resolve(&Resolvers.me/3)
    end

    field :authenticate_user, type: :user do
      arg(:username, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.authenticate_user/3)
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
      middleware(Api.Graphql.Middlewares.HandleChangesetErrors)
    end

    field :update_progress, type: :user do
      arg(:read_chapters_by_manga_id, :json)
      arg(:ongoing_chapter_by_manga_id, :json)

      resolve(&Resolvers.update_progress/3)
      middleware(Api.Graphql.Middlewares.HandleChangesetErrors)
    end
  end

  object :user do
    field :username, :string
    field :token, :string
    field :progress, :progress
  end

  object :progress do
    field :read_chapters_by_manga_id, :json
    field :ongoing_chapter_by_manga_id, :json
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
