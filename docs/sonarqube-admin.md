# SonarQube Server — Administration Notes

### Administration commands and notes for the SonarQube Server (self-hosted) for this project.

> Instance: `https://sonarqube-ft-dpdwb8g8dnhkfbey.swedencentral-01.azurewebsites.net`

---

## Changing the project's main branch via API

SonarQube Community Build does not allow changing the default branch from _main_ to _dev_ through the graphical interface. The REST API must be used instead.

```bash
curl -X POST \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  "https://sonarqube-ft-dpdwb8g8dnhkfbey.swedencentral-01.azurewebsites.net/api/project_branches/rename" \
  -d "project=fernandotonacoder_chrisert_bbc86f72-9ba6-4533-99be-b85658dca317&name=dev"
```

Replace `<ADMIN_TOKEN>` with a User Token generated under **My Account → Security**.

---

## SonarQube Server Badges

SonarQube Server badges require a dedicated badge token. To generate one:

**Project Settings → Badges → Generate a token**

The badge token is different from the analysis token — it is read-only and is used solely to expose metrics publicly.

Badge URL:

```
https://sonarqube-ft-dpdwb8g8dnhkfbey.swedencentral-01.azurewebsites.net/api/project_badges/measure?project=fernandotonacoder_chrisert_bbc86f72-9ba6-4533-99be-b85658dca317&metric=alert_status&token=<BADGE_TOKEN>
```
---

## Project Key

```
fernandotonacoder_chrisert_bbc86f72-9ba6-4533-99be-b85658dca317
```

---

## Required GitHub Repository Secrets

| Secret           | Description                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `SONAR_TOKEN`    | Project Analysis Token generated under My Account → Security → Project Analysis Token → chrisert |
| `SONAR_HOST_URL` | `https://sonarqube-ft-dpdwb8g8dnhkfbey.swedencentral-01.azurewebsites.net`                       |
