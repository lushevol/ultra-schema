package com.ratanone.shuaipoc.services;

import com.ratanone.shuaipoc.generated.types.AddGenericConfigInput;
import com.ratanone.shuaipoc.generated.types.GenericConfig;
import com.ratanone.shuaipoc.generated.types.MutableGenericConfigInput;
import com.ratanone.shuaipoc.generated.types.UltraQueryInput;
import com.ratanone.shuaipoc.generated.types.UltraResult;

public interface GenericConfigService {
  UltraResult fetchGenericConfigs(UltraQueryInput ultraQueryInput);

  GenericConfig fetchGenericConfig(String key);

  GenericConfig addGenericConfig(AddGenericConfigInput addGenericConfigInput);

  Boolean removeGenericConfig(String key);

  GenericConfig updateGenericConfig(String key, MutableGenericConfigInput payload);
}
