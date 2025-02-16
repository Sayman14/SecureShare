import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </CardHeader>
        <CardContent className="prose">
          <h2>Data Collection and Storage</h2>
          <p>
            SecureShare is committed to protecting your privacy. We only collect and store
            the minimum amount of data necessary to provide our password sharing service:
          </p>
          <ul>
            <li>Password title (for identification purposes)</li>
            <li>Encrypted password data</li>
            <li>View count and expiration settings</li>
            <li>Optional access keys (if provided)</li>
          </ul>

          <h2>Security Measures</h2>
          <p>
            We implement several security measures to protect your shared passwords:
          </p>
          <ul>
            <li>All passwords are encrypted using AES-256 encryption before storage</li>
            <li>Passwords are only stored in memory and never written to disk</li>
            <li>Access keys are hashed before comparison</li>
            <li>No logs or analytics data is collected</li>
            <li>No cookies or tracking mechanisms are used</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We follow strict data retention policies:
          </p>
          <ul>
            <li>Passwords are automatically deleted after their expiration time (maximum 7 days)</li>
            <li>Passwords are removed once the maximum view count is reached</li>
            <li>Our cleanup process runs every 5 minutes to ensure expired data is removed</li>
            <li>We do not maintain backups of shared passwords</li>
          </ul>

          <h2>No User Accounts</h2>
          <p>
            SecureShare does not require or support user accounts. This means:
          </p>
          <ul>
            <li>No personal information is ever collected</li>
            <li>No email addresses are stored</li>
            <li>No user tracking or profiling</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We do not use any third-party services, analytics, or tracking tools. The service
            runs entirely on our secure servers without external dependencies.
          </p>

          <h2>Updates to Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be
            reflected on this page with an updated revision date.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about our privacy practices or need to report a
            security concern, please contact our security team immediately.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}