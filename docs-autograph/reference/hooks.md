---
title: Hooks
description: The extension hook for adding a storage method to Autograph.
keywords:
  - autograph
  - hooks
  - extension
  - storage
---

# Hooks

## `autograph_storage_providers`

Adds storage methods to the **Storage Method** setting. It receives the map of method name to class, and returns it with yours added:

```php title="system/user/addons/my_archive/ext.my_archive.php"
public function autograph_storage_providers(array $providers): array
{
    $providers['archive'] = \MyArchive\ArchiveStorage::class;

    return $providers;
}
```

Your class implements `Nerdgency\Autograph\Storage\StorageProviderInterface`:

```php title="system/user/addons/my_archive/ArchiveStorage.php"
namespace MyArchive;

use Nerdgency\Autograph\Library\Image;
use Nerdgency\Autograph\Storage\StorageProviderInterface;

class ArchiveStorage implements StorageProviderInterface
{
    public function label(): string
    {
        return 'Signature archive';
    }

    public function store(Image $image, array $settings, string $fieldName): ?string
    {
        // $image->bytes is a checked PNG; $image->width and ->height its size.
        // Return a PNG data URL or a File id for the entry to save,
        // or null if keeping it failed.
    }
}
```

What `store()` returns is what the entry saves, so it has to be something Autograph can read back: a PNG data URL (`$image->toDataUrl()`) or the id of a File in ExpressionEngine's file manager.

A field saves its method by name, so don't change a name once fields use it. If the add-on that provided a method is removed, fields using it fall back to saving signatures in the entry, so forms keep working.
