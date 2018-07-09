defmodule Scraper.Sites.Cache do
  use GenServer

  @ttl 1

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def get(url) do
    case GenServer.call(__MODULE__, {:get, url}) do
      nil -> {:not_found}
      {_url, result} -> {:ok, result}
    end
  end

  def set(url, response) do
    GenServer.cast(__MODULE__, {:set, url, response})
  end

  def handle_cast({:set, url, response}, state) do
    %{table_name: table_name} = state

    true =
      :ets.insert(
        table_name,
        {url, response, Timex.shift(Timex.now(), minutes: @ttl)}
      )

    {:noreply, state}
  end

  def handle_call({:get, url}, _from, state) do
    %{table_name: table_name} = state

    case :ets.lookup(table_name, url) do
      [] ->
        {:reply, nil, state}

      [{url, response, date}] ->
        if expired?(date) do
          {:reply, {url, response}, state}
        else
          {:reply, nil, state}
        end
    end
  end

  def init(_) do
    table_name = :sits_cache
    :ets.new(table_name, [:named_table, :set, :private])
    {:ok, %{table_name: table_name}}
  end

  defp expired?(date) do
    Timex.before?(Timex.now(), date)
  end
end
