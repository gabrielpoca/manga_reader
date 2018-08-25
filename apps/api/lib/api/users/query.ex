defmodule Api.Users.Query do
  alias Api.Users.Schema
  alias Api.Repo

  def get_by(args) do
    Schema
    |> Repo.get_by(args)
  end

  def insert(user) do
    %Schema{}
    |> Schema.changeset(user)
    |> Schema.progress_changeset(Map.get(user, :progress, %{}))
    |> Repo.insert()
  end

  def update_progress(user, params) do
    progress_changes =
      params.progress
      |> merge_ongoing(user)
      |> merge_reading(user)

    %Schema{id: user.id}
    |> Schema.progress_changeset(%{progress: progress_changes})
    |> Repo.update()
  end

  def authenticate_user(username, password) do
    with user <- Repo.get_by!(Schema, username: username),
         true <- Api.Password.check(password, user.hashed_password) do
      {:ok, user}
    else
      error -> error
    end
  rescue
    _ -> {:error, :not_found}
  end

  defp merge_ongoing(%{ongoing_chapter_by_manga_id: chapters} = progress, user) do
    new_chapters =
      Map.merge(
        user.progress.ongoing_chapter_by_manga_id,
        chapters,
        &merge_ongoing_fn/3
      )

    %{progress | ongoing_chapter_by_manga_id: new_chapters}
  end

  defp merge_ongoing(progress, _user), do: progress

  def merge_reading(%{read_chapters_by_manga_id: chapters} = progress, user) do
    new_chapters =
      Map.merge(
        user.progress.read_chapters_by_manga_id,
        chapters,
        &merge_reading_fn/3
      )

    %{progress | read_chapters_by_manga_id: new_chapters}
  end

  def merge_reading(progress, _user), do: progress

  defp merge_ongoing_fn(_key, value1, value2) do
    Enum.max([value1, value2])
  end

  defp merge_reading_fn(_key, value1, value2) do
    Enum.concat(value1, value2)
    |> Enum.uniq()
    |> Enum.sort()
  end
end
