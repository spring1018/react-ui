"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Papa from "papaparse";
import { useState } from "react";

interface CSVUploaderProps {
	table: string;
}

export const CSVUploader = ({ table }: CSVUploaderProps) => {
	const [csvData, setCsvData] = useState<any[]>([]);
	const { toast } = useToast();

	// CSVファイルを読み取る関数
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			Papa.parse(file, {
				header: true, // CSVのヘッダー行を使用する場合
				complete: (result) => {
					setCsvData(result.data);
				},
				error: (error) => {
					console.error("CSV読み取りエラー:", error);
				},
			});
		}
	};

	const handleUpload = async () => {
		try {
			const response = await fetch(`/api/admin/handle-csv/${table}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data: csvData }),
			});

			if (response.ok) {
				const { count } = await response.json();
				toast({ description: `${count}件のデータをアップロードしました` });
			} else {
				toast({ description: "エラーが発生しました" });
			}
		} catch (error) {
			toast({ description: "エラーが発生しました" });
		}
	};

	const handleExport = () => {
		window.location.href = `/api/admin/handle-csv/${table}`;
	};

	const handleDelete = async () => {
		try {
			const response = await fetch(`/api/admin/delete-table/${table}`, {
				method: "DELETE",
			});

			if (response.ok) {
				toast({ description: `${table}のデータを削除しました` });
			} else {
				toast({ description: "エラーが発生しました" });
			}
		} catch (error) {
			toast({ description: "エラーが発生しました" });
		}
	};

	return (
		<div className="space-y-2">
			<input type="file" accept=".csv" onChange={handleFileUpload} />
			<div className="flex gap-2">
				<Button onClick={handleExport}>CSVをDBからダウンロード</Button>
				<Button onClick={handleUpload} disabled={!csvData.length}>
					CSVをDBにアップロード
				</Button>
				<Button variant={"destructive"} onClick={handleDelete}>
					テーブルのデータを削除
				</Button>
			</div>
			{csvData.length > 0 && (
				<div>
					<h3>CSVデータ</h3>
					<pre>{JSON.stringify(csvData, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};
