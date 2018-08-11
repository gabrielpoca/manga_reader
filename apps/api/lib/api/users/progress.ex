defmodule Api.Users.Progress do
  use Ecto.Schema

  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field :ongoing_chapter_by_manga_id, :map, default: %{}
    field :read_chapters_by_manga_id, :map, default: %{}
  end

  def changeset(progress, params \\ %{}) do
    progress
    |> cast(params, [:ongoing_chapter_by_manga_id, :read_chapters_by_manga_id])
  end
end
