import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Link,
    Font,
    Image,
  } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
  // Create styles
  const styles = StyleSheet.create({
    page: {
        backgroundColor: "#e9ebe6",
        color: "#080807",
        padding: 16
    },
    section: {
        borderRadius: 4,
        backgroundColor: "#d1d6c7",
        padding: 8,
        margin: 8,
    },
    title: {
        fontSize: 16,
    },
    evidence: {
        fontSize: 12,
        border: true,
        borderRadius: 4,
        borderColor: "#373b30",
        padding: 8,
    },
    link: {
        fontSize: 12,
        marginBottom: 4,
        color: '#373b30',
    },
    logo: {
        width: 50,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    contentionText: {
        fontSize: 16,
        color: "#e9ebe6"
    },
    contentionSection: {
        borderRadius: 4,
        backgroundColor: "#545b49",
        padding: 8,
        margin: 8,
    }
  });
  
  // Create Document Component
const RenderCase = () => {
    const cards = useSelector(state => state.app.cards);
    const teamData = useSelector(state => state.app.teamData);

    return (
      <PDFViewer className="w-full">
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src="./DebateToolLogo.png" style={styles.logo}></Image>
                    <Text>Debate Tool</Text>
                </View>
                {teamData.contentions.map((contention, index) => (
                    <View style={styles.contentionSection}>
                        <Text style={styles.contentionText}>Contention {index + 1}</Text>
                        <Text style={{fontSize: 12, color: "#e9ebe6"}}>{contention.name}</Text>
                    </View>
                ))}
                {cards.map(card => (
                    <View key={card.cardID} style={styles.section}>
                        <Text style={styles.title}>{card.title}</Text>
                        <Link src={card.sourceLink} style={styles.link}>Source: {card.sourceName}</Link>
                        <Text style={styles.evidence}>{card.evidence}</Text>
                    </View>
                ))}
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  export default RenderCase;