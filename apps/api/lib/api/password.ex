defmodule Api.Password do
  import Comeonin.Bcrypt, only: [hashpwsalt: 1, checkpw: 2]

  def check(password, hashed_password), do: checkpw(password, hashed_password)

  def hash(nil), do: nil
  def hash(password), do: hash_trimmed(String.trim(password))

  defp hash_trimmed(""), do: nil
  defp hash_trimmed(password), do: hashpwsalt(password)
end
