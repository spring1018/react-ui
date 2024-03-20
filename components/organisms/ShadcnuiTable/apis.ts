type RowDataProps = {
  id: string;
  [key: string]: string;
};

export const POST = async (rowData: Record<string, string>, apiUrl: string) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...rowData }),
    });
    return response.json();
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export const PUT = async (rowData: RowDataProps, apiUrl: string) => {
  const id = rowData.id;
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...rowData }),
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export const DELETE = async (id: string, apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
