"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportButtons({ issues, sprints, projectName }) {
    const downloadCSV = () => {
        const csv = Papa.unparse(
            issues.map((i) => ({
                Title: i.title,
                Status: i.status,
                Priority: i.priority,
                Assignee: i.assignee?.name || "Unassigned",
                Tags: i.tags.join(", "),
            }))
        );

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${projectName}_issues.csv`;
        a.click();
    };

    const downloadPDF = () => {
        const pdf = new jsPDF();

        pdf.setFontSize(16);
        pdf.text(`Project Report: ${projectName}`, 10, 15);

        pdf.setFontSize(12);
        pdf.text(`Total Issues: ${issues.length}`, 10, 25);

        pdf.text("Sprint Summary:", 10, 35);
        sprints.forEach((sprint, index) => {
            pdf.text(
                `${index + 1}. ${
                    sprint.name
                } - ${sprint.status.toUpperCase()} - ${sprint.closedIssues}/${
                    sprint.totalIssues
                } Closed`,
                15,
                42 + index * 7
            );
        });

        let tableStartY = 42 + sprints.length * 7 + 10;

        const rows = issues.map((i) => [
            i.title,
            i.status,
            i.priority,
            i.assignee?.name || "Unassigned",
            i.tags.join(", "),
        ]);

        autoTable(pdf, {
            head: [["Title", "Status", "Priority", "Assignee", "Tags"]],
            body: rows,
            startY: tableStartY,
        });

        const finalY = pdf.lastAutoTable.finalY + 10;
        const completed = issues.filter((i) => i.status === "DONE").length;
        const progress = ((completed / issues.length) * 100).toFixed(2);

        pdf.text(
            `Project Progress: ${progress}% Completed (${completed} of ${issues.length} issues)`,
            10,
            finalY
        );

        pdf.save(`${projectName}_report.pdf`);
    };

    return (
        <div className="flex gap-2 mb-4">
            <Button onClick={downloadCSV}>
                <Download className="mr-2" size={16} /> Export CSV
            </Button>
            <Button onClick={downloadPDF}>
                <Download className="mr-2" size={16} /> Export PDF
            </Button>
        </div>
    );
}
