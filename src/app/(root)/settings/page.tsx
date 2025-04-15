'use client';

import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getAutoReplySettings, updateAutoReplySettings } from '@/lib/actions/gmail';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

interface AutoReplySettings {
  enabled: boolean;
  template: string;
  autoReplyAfter: number;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<AutoReplySettings>({
    enabled: false,
    template: '',
    autoReplyAfter: 10,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    try {
      const result = await getAutoReplySettings();
      if (result.success && result.settings) {
        setSettings(result.settings);
        setError(null);
      } else if (result.error) {
        setError(result.error || 'Failed to load settings');
      }
    } catch (err) {
      setError('Failed to load settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    setSaving(true);
    setSuccess(false);
    try {
      const result = await updateAutoReplySettings(settings);
      if (result.success) {
        setSuccess(true);
        setError(null);
      } else if (result.error) {
        setError(result.error || 'Failed to save settings');
      }
    } catch (err) {
      setError('Failed to save settings');
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Auto-Reply Settings</h2>
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4">
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4 dark:bg-green-900/20 dark:text-green-400">
              <p>Settings saved successfully</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-reply-enabled">Enable Auto-Replies</Label>
                <p className="text-sm text-muted-foreground">
                  When enabled, we will automatically respond to incoming emails
                </p>
              </div>
              <Switch 
                id="auto-reply-enabled"
                checked={settings.enabled}
                onCheckedChange={(checked: boolean) => setSettings({...settings, enabled: checked})}
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="auto-reply-template">Auto-Reply Template</Label>
              <p className="text-sm text-muted-foreground mb-2">
                The message that will be sent as an automatic response
              </p>
              <Textarea
                id="auto-reply-template"
                className="min-h-32 w-full"
                placeholder="Thank you for your message! I'll get back to you soon."
                value={settings.template}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                  setSettings({...settings, template: e.target.value})
                }
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="auto-reply-delay">Auto-Reply Delay (minutes)</Label>
              <p className="text-sm text-muted-foreground mb-2">
                How long to wait before sending an automatic reply
              </p>
              <input
                id="auto-reply-delay"
                type="number"
                className="w-full max-w-xs p-2 border rounded"
                min="0"
                value={settings.autoReplyAfter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setSettings({...settings, autoReplyAfter: parseInt(e.target.value) || 0})
                }
                disabled={loading}
              />
            </div>

            <Button 
              onClick={saveSettings} 
              disabled={loading || saving}
            >
              {saving ? (
                <>
                  <Save className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="col-span-1 border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Connected Accounts</h3>
              <div className="flex items-center gap-3 mt-2 p-2 border rounded">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  G
                </div>
                <div>
                  <p className="text-sm font-medium">Google</p>
                  <p className="text-xs text-muted-foreground">Connected for Gmail</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 