import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import i18next from "i18next";
import PDFQRCode from "./PDFQRCode";

// Define types for the component
interface ResumePDFProps {
  data: ResumeData;
  isRTL: boolean;
}

// Create styles
const createStyles = (isRTL: boolean, template: "classic" | "modern" | "creative") => {
  // Define colors based on template
  let primaryColor = "#000000";
  let secondaryColor = "#555555";

  if (template === "modern") {
    primaryColor = "#2563eb";
    secondaryColor = "#3b82f6";
  } else if (template === "creative") {
    primaryColor = "#7c3aed";
    secondaryColor = "#8b5cf6";
  }

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: 30,
      fontFamily: "Helvetica",
      fontSize: 10,
      color: "#333333",
    },
    section: {
      marginBottom: 10,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
      marginVertical: 8,
    },
    header: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 2,
      color: primaryColor,
      textAlign: isRTL ? "right" : "left",
    },
    subheader: {
      fontSize: 12,
      marginBottom: 8,
      color: secondaryColor,
      textAlign: isRTL ? "right" : "left",
    },
    contactRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      marginTop: 5,
      flexWrap: "wrap",
    },
    contactItem: {
      marginRight: isRTL ? 0 : 15,
      marginLeft: isRTL ? 15 : 0,
      marginBottom: 3,
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
    },
    contactLabel: {
      fontWeight: "bold",
      fontSize: 9,
    },
    contactValue: {
      fontSize: 9,
      marginLeft: 3,
    },
    sectionHeader: {
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 6,
      color: primaryColor,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
      paddingBottom: 2,
      textAlign: isRTL ? "right" : "left",
    },
    normalText: {
      fontSize: 9,
      marginBottom: 3,
      textAlign: isRTL ? "right" : "left",
      lineHeight: 1.4,
    },
    itemRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    itemTitle: {
      fontSize: 10,
      fontWeight: "bold",
      color: secondaryColor,
    },
    itemSubtitle: {
      fontSize: 9,
      fontWeight: "bold",
      marginBottom: 2,
      textAlign: isRTL ? "right" : "left",
      color: "#666666",
    },
    dateText: {
      fontSize: 9,
      fontStyle: "italic",
      color: "#99999980",
    },
    twoColumnSection: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      marginTop: 5,
    },
    column: {
      width: "48%",
    },
    listItem: {
      flexDirection: isRTL ? "row-reverse" : "row",
      marginBottom: 2,
      alignItems: "center",
    },
    bullet: {
      marginRight: isRTL ? 0 : 4,
      marginLeft: isRTL ? 4 : 0,
      fontSize: 10,
      alignSelf: "center",
    },
    skillLevel: {
      flexDirection: "row",
      marginLeft: 5,
    },
    star: {
      fontSize: 9,
      color: primaryColor,
    },
    footer: {
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: "#e5e5e5",
      paddingTop: 10,
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    footerText: {
      fontSize: 8,
      color: "#999999",
      textAlign: isRTL ? "right" : "left",
    },
    qrCodeContainer: {
      alignItems: isRTL ? "flex-start" : "flex-end",
    },
  });
};

// Helper function to get translations
const t = (key: string) => {
  return i18next.t(key);
};

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  } catch {
    return dateString;
  }
};

// Create the PDF component
const ResumePDF: React.FC<ResumePDFProps> = ({ data, isRTL }) => {
  const styles = createStyles(isRTL, data.template);

  // Helper function to render skill stars
  const renderSkillStars = (level: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i < level ? "★" : "☆"}
        </Text>
      );
    }
    return stars;
  };

  // Generate QR code value - use custom link if provided, otherwise use contact info
  const qrCodeValue = data.personalInfo.qrLink || `BEGIN:VCARD
VERSION:3.0
N:${data.personalInfo.name}
TEL:${data.personalInfo.phone}
EMAIL:${data.personalInfo.email}
ADR:${data.personalInfo.address}
END:VCARD`;

  // QR code title - use custom title if provided, otherwise use default
  const qrCodeTitle = data.personalInfo.qrLink 
    ? (data.personalInfo.qrTitle || t('qrCode.defaultTitle'))
    : t('pdf.scanForContact');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <Text style={styles.header}>{data.personalInfo.name}</Text>
          <Text style={styles.subheader}>{data.personalInfo.jobTitle}</Text>

          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>{t("form.email")}:</Text>
              <Text style={styles.contactValue}>{data.personalInfo.email}</Text>
            </View>

            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>{t("form.phone")}:</Text>
              <Text style={styles.contactValue}>{data.personalInfo.phone}</Text>
            </View>

            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>{t("form.address")}:</Text>
              <Text style={styles.contactValue}>{data.personalInfo.address}</Text>
            </View>
          </View>
        </View>

        {/* Divider after contact info */}
        <View style={styles.divider} />

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t("form.summary")}</Text>
          <Text style={styles.normalText}>{data.personalInfo.summary}</Text>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t("form.experience")}</Text>

          {data.experience.length === 0 ? (
            <Text style={styles.normalText}>{t("form.noExperience")}</Text>
          ) : (
            data.experience.map((exp, index) => (
              <View key={exp.id} style={{ marginBottom: index < data.experience.length - 1 ? 8 : 0 }}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.dateText}>
                    {formatDate(exp.startDate)} - {exp.isPresent ? t("form.present") : formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.normalText}>{exp.description}</Text>
              </View>
            ))
          )}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t("form.education")}</Text>

          {data.education.length === 0 ? (
            <Text style={styles.normalText}>{t("form.noEducation")}</Text>
          ) : (
            data.education.map((edu, index) => (
              <View key={edu.id} style={{ marginBottom: index < data.education.length - 1 ? 8 : 0 }}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{`${edu.degree} - ${edu.field}`}</Text>
                  <Text style={styles.dateText}>
                    {formatDate(edu.startDate)} - {edu.isPresent ? t("form.present") : formatDate(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                {edu.description && <Text style={styles.normalText}>{edu.description}</Text>}
              </View>
            ))
          )}
        </View>

        {/* Skills and Languages */}
        <View style={styles.twoColumnSection}>
          {/* Skills */}
          <View style={styles.column}>
            <Text style={styles.sectionHeader}>{t("form.skills")}</Text>

            {data.skills.length === 0 ? (
              <Text style={styles.normalText}>{t("form.noSkills")}</Text>
            ) : (
              data.skills.map((skill) => (
                <View key={skill.id} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.normalText}>{skill.name}</Text>
                  <View style={styles.skillLevel}>{renderSkillStars(skill.level)}</View>
                </View>
              ))
            )}
          </View>

          {/* Languages */}
          <View style={styles.column}>
            <Text style={styles.sectionHeader}>{t("form.languages")}</Text>

            {data.languages.length === 0 ? (
              <Text style={styles.normalText}>{t("form.noLanguages")}</Text>
            ) : (
              data.languages.map((lang) => (
                <View key={lang.id} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.normalText}>
                    {lang.name} ({t(`proficiencyLevels.${lang.proficiency}`)})
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Social Media (if any) */}
        {data.socialMedia.length > 0 && (
          <View style={[styles.section, { marginTop: 10 }]}>
            <Text style={styles.sectionHeader}>{t("form.social")}</Text>

            {data.socialMedia.map((social) => (
              <View key={social.id} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  {social.platform}: {social.url}
                </Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.footer}>
          <View style={styles.qrCodeContainer}>
            <PDFQRCode 
              value={qrCodeValue}
              size={80}
              title={qrCodeTitle}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
