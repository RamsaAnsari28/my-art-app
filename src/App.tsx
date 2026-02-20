import { useEffect, useRef, useState } from "react";
import { DataTable, type DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import type { Artwork } from "./types/artwork";
import { fetchArtworks } from "./services/api";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Persistent selection by IDs
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectCount, setSelectCount] = useState<string>("");

  const overlayRef = useRef<OverlayPanel>(null);

  // Fetch data per page
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchArtworks(page);
        setArtworks(response.data);
        setTotalRecords(response.pagination.total);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page]);

  // Handle pagination
  const handlePage = (event: DataTablePageEvent) => {
    setPage(event.page! + 1); // DataTable page index starts at 0
  };

  // Handle checkbox selection
  const handleSelectionChange = (event: { value: Artwork[] }) => {
    const newSelected = new Set(selectedIds);
    event.value.forEach((row) => newSelected.add(row.id));
    setSelectedIds(newSelected);
  };

  // Custom row selection using OverlayPanel
  const handleCustomSelect = () => {
    const count = Number(selectCount);
    if (!count || count <= 0) {
      alert("Enter a valid number");
      return;
    }
    if (count > artworks.length) {
      alert("Cannot select more than rows on current page");
      return;
    }

    const newSelected = new Set(selectedIds);
    artworks.slice(0, count).forEach((row) => newSelected.add(row.id));

    setSelectedIds(newSelected);
    overlayRef.current?.hide();
    setSelectCount("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Artwork Table</h2>

      <Button
        label="Custom Select"
        onClick={(e) => overlayRef.current?.toggle(e)}
        style={{ marginBottom: "10px" }}
      />

      <OverlayPanel ref={overlayRef}>
        <div style={{ display: "flex", gap: "10px" }}>
          <InputText
            value={selectCount}
            onChange={(e) => setSelectCount(e.target.value)}
            placeholder="Enter number"
          />
          <Button label="Apply" onClick={handleCustomSelect} />
        </div>
      </OverlayPanel>

      <DataTable
        value={artworks}
        paginator
        lazy
        rows={12}
        totalRecords={totalRecords}
        loading={loading}
        onPage={handlePage}
        dataKey="id"
        selectionMode="multiple"
        selection={artworks.filter((row) => selectedIds.has(row.id))}
        onSelectionChange={handleSelectionChange}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
}

export default App;
