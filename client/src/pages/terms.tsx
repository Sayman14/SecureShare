import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
        </CardHeader>
        <CardContent className="prose">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using SecureShare, you agree to these terms and conditions. If you do not
            agree with any part of these terms, you must not use this service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            SecureShare provides temporary password sharing with the following features:
          </p>
          <ul>
            <li>Time-based expiry (up to 7 days)</li>
            <li>View count limitations</li>
            <li>Optional access key protection</li>
            <li>Automatic data deletion</li>
          </ul>

          <h2>3. Use Restrictions</h2>
          <p>
            You agree not to use SecureShare for:
          </p>
          <ul>
            <li>Sharing illegal or harmful content</li>
            <li>Attempting to bypass security measures</li>
            <li>Reverse engineering the service</li>
            <li>Automated access or scraping</li>
            <li>Reselling or commercial redistribution</li>
          </ul>

          <h2>4. Service Limitations</h2>
          <p>
            Please be aware of the following limitations:
          </p>
          <ul>
            <li>Maximum password storage time is 7 days</li>
            <li>Maximum 100 views per shared password</li>
            <li>Service availability is not guaranteed</li>
            <li>Data may be deleted earlier than specified in the following circumstances:
              <ul>
                <li>Detection of suspicious activity or automated access attempts</li>
                <li>Violations of our terms of service</li>
                <li>System maintenance or technical issues</li>
                <li>Legal compliance requirements</li>
              </ul>
            </li>
          </ul>

          <h2>5. Data Handling Transparency</h2>
          <p>
            We implement AES-256 encryption to protect your shared passwords. Please note:
          </p>
          <ul>
            <li>All passwords are encrypted before storage using AES-256</li>
            <li>There is no password recovery option - if you lose the share link or access key, the data cannot be retrieved</li>
            <li>Encryption keys are never stored alongside the encrypted data</li>
            <li>We do not log or track decryption attempts</li>
          </ul>

          <h2>6. Security Responsibilities</h2>
          <p>
            While we implement strong security measures, you are responsible for:
          </p>
          <ul>
            <li>Keeping share links confidential</li>
            <li>Securely communicating access keys to recipients</li>
            <li>Ensuring recipients are trustworthy</li>
            <li>Not sharing sensitive credentials that could cause harm if exposed</li>
          </ul>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" without warranties of any kind, either express
            or implied. We do not guarantee continuous, uninterrupted access to the service.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            SecureShare shall not be liable for any direct, indirect, incidental, special,
            or consequential damages resulting from:
          </p>
          <ul>
            <li>Use or inability to use the service</li>
            <li>Data loss due to technical failures or system outages</li>
            <li>Unauthorized access to shared passwords</li>
            <li>Early deletion of data due to security measures</li>
            <li>Network or transmission errors</li>
          </ul>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of
            the service after changes constitutes acceptance of the new terms.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with applicable
            laws, without regard to conflicts of law principles.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
