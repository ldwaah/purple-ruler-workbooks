import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Lesson } from "@/lib/schema";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
  header: { marginBottom: 16, borderBottomWidth: 2, borderBottomColor: "#5b21b6", paddingBottom: 8 },
  title: { fontSize: 18, fontWeight: "bold", color: "#5b21b6" },
  meta: { fontSize: 9, color: "#444", marginTop: 4 },
  sectionTitle: { fontSize: 13, fontWeight: "bold", marginTop: 14, marginBottom: 6 },
  prompt: { fontSize: 11, marginBottom: 4 },
  scaffold: { fontSize: 9, fontStyle: "italic", color: "#555", marginBottom: 4 },
  line: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginBottom: 12, minHeight: 20 },
  option: { fontSize: 10, marginLeft: 8, marginBottom: 2 },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, fontSize: 8, color: "#888" },
});

const SECTION_LABELS: Record<string, string> = {
  connect: "Connect",
  practice: "Practice",
  check: "Check",
  reflect: "Reflect",
  stretch: "Stretch",
};

export function LessonPdfDocument({ lesson }: { lesson: Lesson }) {
  let q = 0;

  return (
    <Document title={`${lesson.title} - Purple Ruler Workbook`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Purple Ruler - {lesson.title}</Text>
          <Text style={styles.meta}>
            {lesson.subject === "english" ? "English" : "Mathematics"} · Year{" "}
            {lesson.year} · Lesson {lesson.lessonUnits} · {lesson.examBoard}
          </Text>
          <Text style={styles.meta}>Block: {lesson.blockTitle}</Text>
          <Text style={styles.meta}>Add-on workbook. Complete after your lesson.</Text>
        </View>

        <Text style={{ marginBottom: 10 }}>{lesson.unitAim}</Text>

        {lesson.sections.map((section) => (
          <View key={section.type} wrap={false}>
            <Text style={styles.sectionTitle}>
              {section.title ?? SECTION_LABELS[section.type]}
            </Text>
            {section.items.map((item) => {
              const num = item.type === "info" ? null : ++q;
              return (
                <View key={item.id} wrap={false}>
                  <Text style={styles.prompt}>
                    {num !== null ? `${num}. ` : ""}
                    {item.prompt}
                  </Text>
                  {item.scaffold && (
                    <Text style={styles.scaffold}>Scaffold: {item.scaffold}</Text>
                  )}
                  {item.type === "info" && "content" in item && (
                    <Text style={{ fontSize: 10, marginBottom: 6 }}>
                      {item.content}
                    </Text>
                  )}
                  {(item.type === "mcq" || item.type === "multi_select") &&
                    item.options.map((o) => (
                      <Text key={o} style={styles.option}>
                        ○ {o}
                      </Text>
                    ))}
                  {item.type === "ordering" &&
                    item.options.map((o, i) => (
                      <Text key={o} style={styles.option}>
                        {i + 1}. {o}
                      </Text>
                    ))}
                  {item.type !== "info" && <View style={styles.line} />}
                </View>
              );
            })}
          </View>
        ))}

        <Text style={styles.footer} fixed>
          Purple Ruler KS4 Workbook · {lesson.id}
        </Text>
      </Page>
    </Document>
  );
}
