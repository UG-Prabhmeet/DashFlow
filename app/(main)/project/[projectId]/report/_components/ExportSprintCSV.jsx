export function ExportSprintCSV({ sprints, projectName }) {
    const handleDownload = () => {
        const rows = sprints.map((s) => ({
            Name: s.name,
            Status: s.status,
            StartDate: new Date(s.startDate).toLocaleDateString(),
            EndDate: new Date(s.endDate).toLocaleDateString(),
            ClosedIssues: s.issues.filter((i) => i.status === "DONE").length,
            TotalIssues: s.issues.length,
        }));

        const csv = Papa.unparse(rows);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${projectName}_sprints.csv`;
        a.click();
    };

    return (
        <Button onClick={handleDownload} variant="outline">
            Export Sprint CSV
        </Button>
    );
}
