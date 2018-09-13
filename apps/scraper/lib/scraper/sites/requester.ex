defmodule Scraper.Sites.Requester do
  defmacro __using__(opts) do
    quote do
      @url unquote(opts[:url])

      alias Scraper.Sites.Cache

      defp get(url) do
        full_url = @url <> "#{url}"

        case get_from_cache(full_url) do
          {:not_found} ->
            {:ok, res} = Tesla.get(full_url)
            set_in_cache(full_url, res)
            {:ok, res}

          {:ok, res} ->
            {:ok, res}
        end
      end

      defp get_from_cache(url) do
        Cache.get(url)
      end

      defp set_in_cache(url, response) do
        Cache.set(url, response)
      end
    end
  end
end
