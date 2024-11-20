package com.ratanone.shuaipoc.services;

import java.util.List;

public interface GenericConfigService {
    List<GenericConfig> genericConfigs(String query);
    GenericConfig genericConfig(String id);

    GenericConfig addGenericConfig(AddGenericConfigInput addGenericConfigInput);
    GenericConfig removeGenericConfig(String id);
    GenericConfig updateGenericConfig(String id, MutableGenericConfigInput payload);
}
